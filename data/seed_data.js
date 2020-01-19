module.exports = {
  class: [
    {
      name: "Loft Test",
      associationWith: "ORDER",
      status: "ACTIVE",
      colorCode: "RED"
    },
    {
      name: "Loft Truck",
      associationWith: "CARRIERS",
      status: "ACTIVE",
      colorCode: "YELLO"
    }
  ],
  subsidiary: [
    {
      code: "LOFT_DIV_001",
      name: "TRUCK RELATE",
      unitNo: "LOFT_11",
      phone: "213133",
      cell: "1239799992",
      fax: "+9991273333",
      email: "test@loft.co",
      status: "ACTIVE"
    },
    {
      code: "LOFT_DIV_002",
      name: "TRUCK RELATED",
      unitNo: "LOFT_12",
      phone: "213133",
      cell: "1239799992",
      fax: "+9991273333",
      email: "test@loft.co",
      status: "ACTIVE"
    }
  ],
  truck: [
    {
      code: "LOFT_TRUCK_001",
      name: "TORONTO TRUCK",
      unitNo: "LOFT_11",
      phone: "213133",
      cell: "1239799992",
      fax: "+9991273333",
      email: "test@loft.co",
      status: "ACTIVE",
      divisionId: 1,
      categoryId: 1
    },
    {
      code: "LOFT_TRUCK_002",
      name: "CALGARY TRUCK",
      unitNo: "LOFT_12",
      phone: "213133",
      cell: "1239799992",
      fax: "+9991273333",
      email: "test@loft.co",
      status: "ACTIVE",
      divisionId: 1,
      categoryId: 1
    }
  ],
  item: [
    {
      code: "ITEM_LOFT_01",
      name: "TIRE",
      partNo: "32",
      description: "test item",
      equipmentType: "TRUCK",
      quantityUnit: "PCS",
      status: "ACTIVE"
    }
  ],
  todo: [
    {
      name: "PURCHASE ORDER",
      userId: 1
    },
    {
      name: "GENERAL",
      userId: 1
    }
  ],
  issue: [
    {
      equipmentType: "TRUCK",
      title: "MAJOR SCRATCHES",
      type: "GENERAL",
      reportedOn: "Thu Jan 09 2020 18:16:15 GMT+0530 (India Standard Time)",
      postedOn: "Thu Jan 09 2020 18:16:15 GMT+0530 (India Standard Time)",
      odometer: 12.33,
      status: "OPEN",
      description: "SCRATCHES",
      reportedBy: "ROHIT TATU",
      truckId: 1,
      categoryId: 1,
      divisionId: 1
    }
  ],
  task: [
    {
      name: "Purchase Order of issue Number 001",
      description: "Create purchase order related to issue number 001",
      status: "INCOMPLETE",
      issueId: 1
    }
  ]
};
